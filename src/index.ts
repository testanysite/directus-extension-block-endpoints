import { defineHook, type HookContext } from '@directus/extensions-sdk';

/**
 * Environment configuration helper with proper typing
 */
function getEnv<T>(variable: string, env: Record<string, unknown>, fallback: T): T {
	if (!(variable in env)) return fallback;
	return env[variable] as T;
}

export default defineHook(({ init, registerAction, registerFilter }: HookContext, { env, logger }: any) => {
	// Load configuration with proper defaults
	const enabled = getEnv<boolean>('BLOCKED_ENDPOINTS_ENABLED', env, true);
	const paths = getEnv<string[]>('BLOCKED_ENDPOINTS_PATHS', env, []);
	const status = getEnv<number>('BLOCKED_ENDPOINTS_STATUS', env, 418);
	const contentType = getEnv<string>('BLOCKED_ENDPOINTS_TYPE', env, 'application/json');
	const responseBody = getEnv<string>('BLOCKED_ENDPOINTS_BODY', env, '{ "error": "Page blocked! I\'m a teapot now" }');

	// Validate configuration
	if (!enabled) {
		logger.warn('Block Endpoints extension is disabled');
		return;
	}

	if (paths.length === 0) {
		logger.error('Environment variable "BLOCKED_ENDPOINTS_PATHS" needs to contain at least one path! try: /server/info');
		return;
	}

	// Log configuration setup
	logger.info(`Block Endpoints extension enabled. Blocking ${paths.length} path(s)`);
	paths.forEach(path => logger.debug(`Blocking route: ${path}`));

	// Register middleware to block specified endpoints
	init("app.before", ({ app }: any) => {
		paths.forEach(path => {
			logger.debug(`Setting up block for route: ${path}`);
			app.get(path, (_req: any, res: any) => {
				try {
					res.set("Content-Type", contentType);
					res.status(status);
					res.send(responseBody);
					logger.info(`Blocked request to: ${path} with status: ${status}`);
				} catch (error) {
					logger.error(`Error blocking request to ${path}:`, error);
					res.status(500).json({ error: 'Internal server error' });
				}
			});
		});
	});
});
