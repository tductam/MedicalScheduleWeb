import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Profile } from "@/types/profiles";
import { today } from "@/utils/formatDate";

const schema = z.object({
  fullName: z.string().trim().min(2, "Tên tối thiểu 2 ký tự"),
  mobileNumber: z.string().trim().min(8, "Số điện thoại không hợp lệ"),
  dateOfBirth: z.string().min(1, "Chưa chọn ngày sinh"),
  gender: z.enum(["MALE", "FEMALE"], "Chưa chọn giới tính"),
  relationship: z.string().trim().min(2, "Chưa chọn quan hệ"),
  idNumber: z.string().trim().min(8, "Số CCCD không hợp lệ"),
  issueDate: z.string().min(1, "Chưa chọn ngày cấp"),
  job: z.string().trim().min(2, "Nghề nghiệp không hợp lệ"),
  address: z.object({
    province: z.string().trim().min(2, "Chưa chọn"),
    street1: z.string().trim().min(2, "Chưa chọn"),
    street2: z.string().trim().min(2, "Chưa chọn"),
  }),
});

export type Values = z.infer<typeof schema>;

type FormProps = {
  initialData?: Profile;
  onSubmit: (data: Values) => Promise<void>;
};

export function Form({ initialData, onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    values: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <input
          {...register("fullName")}
          className="h-10 w-full border border-neutral-300 px-3 text-sm"
          placeholder="Họ và tên"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("mobileNumber")}
          className="h-10 w-full border border-neutral-300 px-3 text-sm"
          placeholder="Số điện thoại"
        />
        {errors.mobileNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.mobileNumber.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-10 py-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Ngày sinh</label>
          <input
            type="date"
            max={today}
            {...register("dateOfBirth")}
            className="h-10 w-full border border-neutral-300 px-3 text-sm"
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 mr-5">
          <label className="flex gap-2">
            <input type="radio" {...register("gender")} value="MALE" />
            Nam
          </label>
          <label className="flex gap-2">
            <input type="radio" {...register("gender")} value="FEMALE" />
            Nữ
          </label>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 gap-4">
        {initialData?.relationship !== "Owner" && (
          <div>
            <label className="mb-1 block text-sm font-medium">
              Hồ sơ này của ai
            </label>
            <input
              {...register("relationship")}
              className="h-10 w-full border border-neutral-300 px-3 text-sm"
            />
            {errors.relationship && (
              <p className="mt-1 text-sm text-red-600">
                {errors.relationship.message}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Số CCCD</label>
          <input
            {...register("idNumber")}
            className="h-10 w-full border border-neutral-300 px-3 text-sm"
          />
          {errors.idNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.idNumber.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Ngày cấp</label>
          <input
            type="date"
            max={today}
            {...register("issueDate")}
            className="h-10 w-full border border-neutral-300 px-3 text-sm"
          />
          {errors.issueDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.issueDate.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Nghề nghiệp</label>
          <input
            {...register("job")}
            className="h-10 w-full border border-neutral-300 px-3 text-sm"
          />
          {errors.job && (
            <p className="mt-1 text-sm text-red-600">{errors.job.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Tỉnh/Thành phố
          </label>
          <input
            {...register("address.province")}
            className="h-10 w-full border border-neutral-300 px-3 text-sm"
          />
          {errors.address?.province && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.province.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Xã/Phường</label>
          <input
            {...register("address.street1")}
            className="w-full border border-neutral-300 p-3 text-sm"
          />
          {errors.address?.street1 && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.street1.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Địa chỉ cụ thể
          </label>
          <input
            {...register("address.street2")}
            className="w-full border border-neutral-300 p-3 text-sm"
          />
          {errors.address?.street2 && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.street2.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-10 bg-blue-500 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Đang gửi…" : "Gửi"}
      </button>
    </form>
  );
}
