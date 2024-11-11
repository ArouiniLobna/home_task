import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useCategories } from "../../../hooks/queries/useCategories";

interface TrackerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  title: string;
}

type Inputs = {
  name: string;
  category: string;
  limit: number;
  period: "weekly" | "monthly";
};

export const TrackerForm: React.FC<TrackerFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}) => {
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  // Reset the form with initialData when the dialog opens or initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: "",
        category: "",
        limit: 0,
        period: "weekly",
      });
    }
  }, [initialData, reset]);

  const HandleOnSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl  bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-black">
              {title}
            </DialogTitle>

            <form onSubmit={handleSubmit(HandleOnSubmit)}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tracker Name
              </label>
              <input
                defaultValue={initialData?.name}
                className="w-full rounded-md border border-gray-300 p-2"
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
              />

              {errors.name && <span>This field is required</span>}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                defaultValue={initialData?.category}
                className="w-full rounded-md border border-gray-300 p-2"
                {...register("category", { required: true })}
                aria-invalid={errors.category ? "true" : "false"}
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* errors will return when field validation fails  */}
              {errors.category && <span>This field is required</span>}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limit
              </label>
              <input
                defaultValue={initialData?.limit}
                type="number"
                className="w-full rounded-md border border-gray-300 p-2"
                {...register("limit", { required: true })}
                aria-invalid={errors.limit ? "true" : "false"}
              />
              {/* errors will return when field validation fails  */}
              {errors.limit && <span>This field is required</span>}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <select
                defaultValue={initialData?.period}
                className="w-full rounded-md border border-gray-300 p-2"
                {...register("period", { required: true })}
                aria-invalid={errors.period ? "true" : "false"}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-sm"
                >
                  {initialData ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
