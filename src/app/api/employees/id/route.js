import {employees} from "../data"
import { NextResponse } from "next/server";

let employees = [
  { id: 1, name: "Ravi Kumar", role: "Developer", email: "ravikr@example.com" },
  { id: 2, name: "Ayesha Singh", role: "UI/UX Designer", email: "ayeshasingh@example.com" },
  { id: 3, name: "Ragini Roy", role: "Frontend Developer", email: "royragini123@example.com" },
  { id: 4, name: "Siddhartha Kumar", role: "Fullstack Developer", email: "sid12@example.com" },
  { id: 5, name: "Rimjhim Sinha", role: "UI/UX Designer", email: "sinharimjhim@example.com" },
];


export async function GET(req, { params }) {
  const emp = employees.find((e) => e.id === Number(params.id));
  return NextResponse.json(emp || {});
}


export async function PUT(req, { params }) {
  const body = await req.json();
  employees = employees.map((e) =>
    e.id === Number(params.id) ? { ...e, ...body } : e
  );
  return NextResponse.json({ success: true });
}
export async function DELETE(req, { params }) {
  const id = Number(params.id);
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  employees.splice(index, 1); 
  return NextResponse.json({ success: true });
}
