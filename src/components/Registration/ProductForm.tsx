"use client";

import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import RegistrationController from "./RegistrationController";
import ImageForm from "../InputField/ImageForm";
import InputField from "@/components/InputField/InputField";
import TextareaField from "@/components/InputField/TextareaField";
import ItemTag from "@/components/Items/ItemTag";
import { ProductFormProps } from "@/types/entities";

const ProductForm = ({
  initialData = {},
  onSubmit,
  mode = "create",
}: ProductFormProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setImages(initialData.images || []);
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price || "");
      setTags(initialData.tags || []);
    }
  }, [mode, initialData]);

  const isFormValid =
    title.trim() !== "" && description.trim() !== "" && price.trim() !== "";

  const handleSubmit = async () => {
    if (!isFormValid) return;
    await onSubmit({ title, description, price: Number(price), tags, images });
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (tags.length < 5) {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <section>
      <RegistrationController
        onClick={handleSubmit}
        mode={mode}
        disabled={!isFormValid}
      />

      <div className="flex flex-col items-start gap-6 mx-6">
        <ImageForm />

        <InputField
          title="상품명"
          type="text"
          id="title"
          placeholder="상품명을 입력해주세요."
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />

        <TextareaField
          title="상품 소개"
          id="description"
          placeholder="상품 소개를 입력해주세요."
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />

        <InputField
          title="판매가격"
          type="number"
          id="price"
          placeholder="판매가격을 입력해주세요."
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
        />

        <form className="flex flex-col items-start gap-4 w-full mb-8">
          <label className="text-lg font-semibold text-gray-800">태그</label>
          <input
            type="text"
            placeholder="태그를 입력해주세요."
            value={tagInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTagInput(e.target.value)
            }
            onKeyDown={handleTagKeyDown}
            maxLength={5}
            required
            className="w-full h-14 rounded-xl bg-gray-100 px-6 placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {/* <span className="hidden text-red-500 text-sm font-semibold mt-2">
            5글자 이내로 입력해주세요.
          </span> */}
          <ItemTag tags={tags} removable onRemove={handleRemoveTag} />
        </form>
      </div>
    </section>
  );
};

export default ProductForm;
