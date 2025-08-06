"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create Brand
export const createBrand = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all brands
export const getAllBrands = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      next: {
        tags: ["BRAND"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete brand
export const deleteBrand = async (brandId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/brand/${brandId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
