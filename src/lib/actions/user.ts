// src/lib/actions/user.ts
import { prisma } from "../prisma";

// Define types for the user input
interface EmailAddress {
  email_address: string;
}

interface CreateOrUpdateUserParams {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: EmailAddress[];
  username: string;
}

export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username,
}: CreateOrUpdateUserParams) => {
  try {
    const user = await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        firstName: first_name,
        lastName: last_name,
        profilePicture: image_url,
        email: email_addresses[0].email_address,
        username,
      },
      create: {
        clerkId: id,
        firstName: first_name,
        lastName: last_name,
        profilePicture: image_url,
        email: email_addresses[0].email_address,
        username,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error; // Optionally re-throw the error for better error handling
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await prisma.user.delete({
      where: { clerkId: id },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Optionally re-throw the error for better error handling
  }
};
