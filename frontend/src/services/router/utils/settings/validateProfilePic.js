import { ValidationError } from "@/utils/errors";

export default function validateProfilePic(profilePic) {
  if (!profilePic || !profilePic instanceof File) {
    throw new ValidationError("No file provided or invalid file object!");
  }

  const { name, size, type } = profilePic;

  if (!name) {
    throw new ValidationError("File name should not be empty!");
  }

  const validFileTypes = ["image/png", "image/jpeg"];
  if (!validFileTypes.includes(type)) {
    throw new ValidationError("Unsupported file type!");
  }

  const maxSize = 5 * 1024 * 1024; // 5MB // To do: explore compression techniques to make it more performant 
  if (size > maxSize) {
    throw new ValidationError("File size should not exceed the maximum limit of 5MB!");
  }
}