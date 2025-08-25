import { FieldValues, UseFormWatch } from "react-hook-form";

export const emailValidation = {
    required: "이메일을 입력해주세요.",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "이메일 형식이 올바르지 않습니다.",
    },
};

export const passwordValidation = {
    required: "비밀번호를 입력해주세요.",
    minLength: {
        value: 8,
        message: "비밀번호는 최소 8자 이상이어야 합니다.",
    },
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message: "영문, 숫자, 특수문자를 포함해야 합니다.",
    },
};

export const passwordCheckValidation = (watch: UseFormWatch<FieldValues>) => ({
    required: "비밀번호 확인을 입력해주세요.",
    validate: (value: string) =>
        value === watch("password") || "비밀번호가 일치하지 않습니다.",
});