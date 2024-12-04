import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import DOMPurify from 'dompurify';
export const countUpAchievement = async (pathname: string, result: string): Promise<void> => {
  (async () => {
    await axios.post(pathname, { result });
  })();
}

/**
 * テキストのサニタイジング
 * @param text 
 * @returns 
 */
export const sanitizeText = (text: string): { __html: string } => {

  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const convertedText = text.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer" style="text-decoration-line:underline; text-decoration-color:cyan;">$1</a>');

  // DOMPurifyでサニタイズ(許可する)
  const sanitizedHTML = DOMPurify.sanitize(convertedText, {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'style']
  });
  return { __html: sanitizedHTML };
};
