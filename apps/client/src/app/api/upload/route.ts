import { NextResponse } from "next/server";
import { R2Service } from "@saas/core";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyId, filename, contentType } = body;

    if (!companyId || !filename || !contentType) {
      return NextResponse.json(
        { error: "companyId, filename e contentType são obrigatórios" },
        { status: 400 }
      );
    }

    const presignedData = await R2Service.createPresignedUploadUrl({
      companyId,
      filename,
      contentType,
    });

    return NextResponse.json(presignedData);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno de upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
