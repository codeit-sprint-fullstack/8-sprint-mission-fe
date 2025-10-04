"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import Text from "@/components/atoms/Text";

interface AlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message: string;
  confirmText?: string;
}

export default function Alert({
  open,
  onOpenChange,
  title,
  message,
  confirmText = "확인",
}: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white rounded-2xl px-6 py-12 max-w-[400px] w-[calc(100%-2rem)]">
        <AlertDialogHeader className="text-center">
          {title ? (
            <AlertDialogTitle className="text-lg font-medium mb-2">
              {title}
            </AlertDialogTitle>
          ) : (
            <VisuallyHidden>
              <AlertDialogTitle>알림</AlertDialogTitle>
            </VisuallyHidden>
          )}
          <AlertDialogDescription className="text-center text-gray-700 leading-relaxed">
            <Text
              as="span"
              styleName="text-2lg-regular"
              className="text-(--gray-700)"
            >
              {message}
            </Text>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogAction
            onClick={() => onOpenChange(false)}
            className="w-full cursor-pointer max-w-[165px] mx-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <Text styleName="text-lg-regular" className="text-(--white)">
              {confirmText}
            </Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
