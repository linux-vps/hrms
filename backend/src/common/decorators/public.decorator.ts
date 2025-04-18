import { SetMetadata } from '@nestjs/common';

/**
 * Key metadata để đánh dấu route là public
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator đánh dấu route là public (không cần xác thực)
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); 