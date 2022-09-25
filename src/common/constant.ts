import { resolve } from 'path';

export const templatePath = resolve(__dirname, '../../public/templates');

export const fileTypes = [
  // modules
  { type: 'controller', alias: 'c', description: 'Controller' },
  { type: 'consumer', alias: 'cs', description: 'Consumer provider' },
  { type: 'dto', alias: 'dto', description: 'DTO class' },
  { type: 'do', alias: 'do', description: 'DO class' },
  { type: 'vo', alias: 'vo', description: 'VO class' },
  { type: 'service', alias: 's', description: 'Service provider' },
  { type: 'repository', alias: 'r', description: 'Repository provider' },
  { type: 'manager', alias: 'm-p', description: 'Async Manage provider' },
  { type: 'provider', alias: 'p', description: 'Provider' },
  { type: 'module', alias: 'm', description: 'Module' },
  // aop
  { type: 'decorator', alias: 'aop-d', description: 'Decorator' },
  { type: 'filter', alias: 'aop-f', description: 'Filter' },
  { type: 'guard', alias: 'aop-g', description: 'Guard' },
  { type: 'interceptor', alias: 'aop-i', description: 'Interceptor' },
  { type: 'pipe', alias: 'aop-p', description: 'Pipe' },
  // test
  { type: 'test', alias: 't', description: 'Spec test file' },
];
