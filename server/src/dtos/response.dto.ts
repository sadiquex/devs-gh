export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
  path?: string;
  statusCode: number;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  error: string;
  timestamp: string;
  path?: string;
  statusCode: number;
  details?: any;
}

export class ResponseBuilder {
  static success<T>(
    data: T,
    message: string = "Operation completed successfully",
    statusCode: number = 200,
    path?: string
  ): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
      path,
      statusCode,
    };
  }

  static error(
    message: string,
    error: string,
    statusCode: number = 500,
    path?: string,
    details?: any
  ): ErrorResponse {
    return {
      success: false,
      message,
      error,
      timestamp: new Date().toISOString(),
      path,
      statusCode,
      details,
    };
  }

  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message: string = "Data retrieved successfully",
    statusCode: number = 200,
    path?: string
  ): PaginatedResponse<T> {
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
      path,
      statusCode,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  static created<T>(
    data: T,
    message: string = "Resource created successfully",
    path?: string
  ): ApiResponse<T> {
    return this.success(data, message, 201, path);
  }

  static updated<T>(
    data: T,
    message: string = "Resource updated successfully",
    path?: string
  ): ApiResponse<T> {
    return this.success(data, message, 200, path);
  }

  static deleted(
    message: string = "Resource deleted successfully",
    path?: string
  ): ApiResponse<null> {
    return this.success(null, message, 200, path);
  }

  static notFound(
    message: string = "Resource not found",
    path?: string
  ): ErrorResponse {
    return this.error(message, "NOT_FOUND", 404, path);
  }

  static badRequest(
    message: string = "Bad request",
    details?: any,
    path?: string
  ): ErrorResponse {
    return this.error(message, "BAD_REQUEST", 400, path, details);
  }

  static unauthorized(
    message: string = "Unauthorized",
    path?: string
  ): ErrorResponse {
    return this.error(message, "UNAUTHORIZED", 401, path);
  }

  static forbidden(
    message: string = "Forbidden",
    path?: string
  ): ErrorResponse {
    return this.error(message, "FORBIDDEN", 403, path);
  }

  static conflict(message: string = "Conflict", path?: string): ErrorResponse {
    return this.error(message, "CONFLICT", 409, path);
  }

  static internalError(
    message: string = "Internal server error",
    path?: string
  ): ErrorResponse {
    return this.error(message, "INTERNAL_ERROR", 500, path);
  }
}
