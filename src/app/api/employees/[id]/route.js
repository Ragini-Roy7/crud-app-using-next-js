import { employees } from "../data"; 
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const index = employees.findIndex((e) => e.id === Number(id));
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  Object.assign(employees[index], body);

  return NextResponse.json({
    success: true,
    employee: employees[index],
  });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  const index = employees.findIndex((e) => e.id === Number(id));
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  employees.splice(index, 1);
  return NextResponse.json({ success: true });
}



