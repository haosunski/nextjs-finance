'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';

export async function createInvoice(formData: FormData) {
    let amount =formData.get('amount') as string
    
    const rawFormData = {
        customerId: formData.get('customerId') as string,
        amount: parseFloat(amount) * 100,
        status: formData.get('status') as string,
    };
      // Test it out:
    const date = new Date().toISOString().split('T')[0];
    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${rawFormData.customerId}, ${rawFormData.amount}, ${rawFormData.status}, ${date})
    `
    } catch (error) {
        
    }
    
    console.log(rawFormData);
    // revalidatePath("/dashboard/invoices")
    redirect("/dashboard/invoices")
}

export async function updateInvoice(id: string, formData: FormData) {
    let amount =formData.get('amount') as string
    // console.log(parseFloat(amount),parseFloat(amount)*100)
    
    const rawFormData = {
        customerId: formData.get('customerId') as string,
        amount: parseFloat(amount) * 100,
        status: formData.get('status') as string,
    };
      // Test it out:
    // const date = new Date().toISOString().split('T')[0];
    console.log(rawFormData)
    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${rawFormData.customerId}, amount = ${rawFormData.amount}, status = ${rawFormData.status}
        WHERE id = ${id}
    `;
    } catch (error) {
        
    }
   
    // console.log(rawFormData);
    // revalidatePath("/dashboard/invoices")
    redirect("/dashboard/invoices")
}  

export async function deleteInvoice(id: string) {
    // throw new Error("errorrrrr occrued")

    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        // console.log(rawFormData);
        revalidatePath("/dashboard/invoices")
        // redirect("/dashboard/invoices")
    } catch (error) {
        throw new Error("error occrued")
    }
    
    
} 

export async function authenticate(formData: FormData) {
    try {
        await signIn('credentials', formData);
      } catch (error) {
        console.log('jhhhh')
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return 'Invalid credentials.';
            default:
              return 'Something went wrong.';
          }
        }
        throw error;
      }
}