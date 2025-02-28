import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const available = searchParams.get("available") === "true";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 12;

  // Define a type for the whereConditions object
  type WhereConditions = {
    category?: { name: { contains: string; mode: "insensitive" } };
    pricePerDay?: { gte?: number; lte?: number };
    available?: boolean;
  };

  const whereConditions: WhereConditions = {};

  if (category) {
    whereConditions.category = {
      name: {
        contains: category,
        mode: "insensitive",
      },
    };
  }

  if (minPrice || maxPrice) {
    whereConditions.pricePerDay = {};
    if (minPrice) whereConditions.pricePerDay.gte = Number(minPrice);
    if (maxPrice) whereConditions.pricePerDay.lte = Number(maxPrice);
  }

  if (available) {
    whereConditions.available = true;
  }

  try {
    const gear = await prisma.gear.findMany({
      where: whereConditions,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(gear);
  } catch (error) {
    console.error("Error fetching gear:", error);
    return NextResponse.json(
        {
          error:
              "Error fetching gear: " +
              (error instanceof Error ? error.message : "Unknown error"),
        },
        { status: 500 }
    );
  }
}
