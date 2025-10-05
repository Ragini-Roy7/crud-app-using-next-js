import {employees } from "./data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(employees);
}

export async function POST(req) {
  const body = await req.json();
  const newEmp = { id: Date.now(), ...body };
  employees.push(newEmp);
  return NextResponse.json(newEmp);
}
