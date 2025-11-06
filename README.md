# Directus Block Endpoints Extension

A modern Directus extension that allows you to block specific endpoints with custom responses. This extension intercepts requests to specified paths and returns configured responses, making it useful for security, development, or maintenance scenarios.

## Features

- **Configurable Endpoint Blocking**: Block specific HTTP endpoints with custom status codes
- **Environment Configuration**: All settings configurable through environment variables
- **Custom Responses**: Set custom response status codes, content types, and response bodies
- **Modern TypeScript**: Fully typed with proper error handling
- **Directus v11+ Compatible**: Updated for latest Directus extension architecture

## Installation

1. Install the extension in your Directus project:
```bash
npm install directus-extension-block-endpoints
```

2. Add the extension to your Directus extensions directory

## Configuration

Configure the extension through environment variables:

### Required Environment Variables

- `BLOCKED_ENDPOINTS_PATHS`: Array of paths to block (e.g., `["/server/info", "/health"]`)

### Optional Environment Variables

- `BLOCKED_ENDPOINTS_ENABLED`: Enable/disable the extension (default: `true`)
- `BLOCKED_ENDPOINTS_STATUS`: HTTP status code to return (default: `418`)
- `BLOCKED_ENDPOINTS_TYPE`: Content-Type for responses (default: `"application/json"`)
- `BLOCKED_ENDPOINTS_BODY`: Response body content (default: `{"error": "Page blocked! I'm a teapot now"}`)

### Example Configuration

```bash
# .env file
BLOCKED_ENDPOINTS_ENABLED=true
BLOCKED_ENDPOINTS_PATHS=["/server/info", "/health", "/debug"]
BLOCKED_ENDPOINTS_STATUS=403
BLOCKED_ENDPOINTS_TYPE="text/plain"
BLOCKED_ENDPOINTS_BODY="This endpoint is not available"
```

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

## Usage Examples

### Basic Usage

Block the server info endpoint:

```bash
BLOCKED_ENDPOINTS_PATHS=["/server/info"]
```

### Multiple Endpoints

```bash
BLOCKED_ENDPOINTS_PATHS=["/server/info", "/health", "/debug", "/metrics"]
```

### Custom Response

```bash
BLOCKED_ENDPOINTS_PATHS=["/admin/users"]
BLOCKED_ENDPOINTS_STATUS=404
BLOCKED_ENDPOINTS_BODY='{"message": "Resource not found"}'
```

## Extension Architecture

This extension uses modern Directus hook patterns:

- **Hook Context**: Properly typed with `HookContext` interface
- **Environment Handling**: Type-safe environment variable access
- **Error Handling**: Comprehensive error handling and logging
- **Logging**: Detailed logging for debugging and monitoring

## Compatibility

- **Directus**: v11.0.0+
- **TypeScript**: 5.4.2+
- **Node.js**: 18.19.1+

## License

MIT

## Changelog

### v1.0.7

- **Updated**: Directus host version to v11.0.0+
- **Improved**: Modern TypeScript patterns and type safety
- **Enhanced**: Error handling and logging
- **Added**: Comprehensive documentation
- **Fixed**: Better environment variable validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
