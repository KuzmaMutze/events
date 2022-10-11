import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { existsSync, readFileSync } from 'fs';

export function getHttpsOptions(): HttpsOptions | undefined {
  const enableHTTPS = process.env.HTTPS_ENABLED;
  const certificatePath = process.env.HTTPS_CERTIFICATE_PATH;

  if (enableHTTPS === '1') {
    console.log('HTTPS is enabled');
    if (!certificatePath) {
      throw new Error('HTTPS is enabled, but certificate path is not provided');
    }
    console.log(`Using certificate ${certificatePath}`);
    if (!existsSync(certificatePath)) {
      throw new Error('Certificate not found');
    }
    return {
      pfx: readFileSync(certificatePath),
    };
  } else {
    console.log('HTTPS is disabled');
  }

  return undefined;
}
