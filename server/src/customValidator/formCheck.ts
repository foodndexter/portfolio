const emailCheck = (input: string, emails?: string[]): string | null => {
  if (!input) {
    return "이메일을 입력하세요."
  }
  if (!input.includes("@")) {
    return '반드시 "@"를 포함해야 합니다.'
  }
  if (!input.split("@")[1].split(".")[1]) {
    return "이메일 형식을 확인해주세요."
  }

  if (emails) {
    if (emails.find((email) => email === input)) {
      return "중복된 이메일입니다."
    }
  }
  return null
}

const passwordCheck = (input: string, min: number, max: number): string | null => {
  if (!input) {
    return "비밀번호를 입력하세요."
  }
  if (input.length < min) {
    return `비밀번호는 ${min}자리 이상이어야 합니다.`
  } else if (input.length > max) {
    return `비밀번호는 ${max}자리 이하이어야 합니다.`
  }

  return null
}

export { emailCheck, passwordCheck }
