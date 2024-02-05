// FUNCTION get random code
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
  // The maximum is exclusive and the minimum is inclusive
}

export const corsOptions = {
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://omok-taupe.vercel.app'], // 출처 허용 옵션
  credentials: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};
