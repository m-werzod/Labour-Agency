'use server';

import { revalidatePath } from 'next/cache';
import { RequestStatus } from '@prisma/client';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireStaff() {
  const session = await auth();
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
    throw new Error('Unauthorized');
  }
  return session;
}

export type ActionResult = { success: true } | { success: false; error: string };

export async function updateRequestStatus(id: string, status: string): Promise<ActionResult> {
  try {
    const session = await requireStaff();
    if (!Object.values(RequestStatus).includes(status as RequestStatus)) {
      return { success: false, error: 'Invalid status' };
    }
    await prisma.employerRequest.update({
      where: { id },
      data: { status: status as RequestStatus },
    });
    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: 'request.status.update',
        entity: 'EmployerRequest',
        entityId: id,
        metadata: { status },
      },
    });
    revalidatePath('/admin/requests');
    revalidatePath(`/admin/requests/${id}`);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('[updateRequestStatus]', error);
    return { success: false, error: 'Could not update status' };
  }
}

export async function addCommunicationLog(formData: FormData): Promise<ActionResult> {
  try {
    const session = await requireStaff();
    const requestId = String(formData.get('requestId') ?? '');
    const channel = String(formData.get('channel') ?? 'note');
    const summary = String(formData.get('summary') ?? '').trim();
    if (!requestId || summary.length < 2) {
      return { success: false, error: 'Missing details' };
    }
    await prisma.communicationLog.create({
      data: { requestId, channel, summary, authorId: session.user.id },
    });
    revalidatePath(`/admin/requests/${requestId}`);
    return { success: true };
  } catch (error) {
    console.error('[addCommunicationLog]', error);
    return { success: false, error: 'Could not add note' };
  }
}

export async function updateContactStatus(id: string, status: string): Promise<ActionResult> {
  try {
    await requireStaff();
    const allowed = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'];
    if (!allowed.includes(status)) return { success: false, error: 'Invalid status' };
    await prisma.contactMessage.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { status: status as any },
    });
    revalidatePath('/admin/messages');
    return { success: true };
  } catch (error) {
    console.error('[updateContactStatus]', error);
    return { success: false, error: 'Could not update' };
  }
}
