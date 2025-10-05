import {employees} from "../data"
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params; 
  const emp = employees.find((e) => e.id === Number(id));
  return NextResponse.json(emp || {});
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  employees = employees.map((e) =>
    e.id === Number(id) ? { ...e, ...body } : e
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const index = employees.findIndex((e) => e.id === Number(id));
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  employees.splice(index, 1);
  return NextResponse.json({ success: true });
}

