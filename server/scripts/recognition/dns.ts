import dns from 'node:dns';
import { promisify } from 'node:util';

export const handler = async (url: string) => {
  let hostname = url;

  // Handle URLs by extracting hostname
  if (hostname.startsWith('http://') || hostname.startsWith('https://')) {
    hostname = new URL(hostname).hostname;
  }

  try {
    const lookupPromise = promisify(dns.lookup);
    const resolve4Promise = promisify(dns.resolve4);
    const resolve6Promise = promisify(dns.resolve6);
    const resolveMxPromise = promisify(dns.resolveMx);
    const resolveTxtPromise = promisify(dns.resolveTxt);
    const resolveNsPromise = promisify(dns.resolveNs);
    const resolveCnamePromise = promisify(dns.resolveCname);
    const resolveSoaPromise = promisify(dns.resolveSoa);
    const resolveSrvPromise = promisify(dns.resolveSrv);
    const resolvePtrPromise = promisify(dns.resolvePtr);

    const [a, aaaa, mx, txt, ns, cname, soa, srv, ptr] = await Promise.all([
      lookupPromise(hostname),
      resolve4Promise(hostname).catch(() => []), // A record
      resolve6Promise(hostname).catch(() => []), // AAAA record
      resolveMxPromise(hostname).catch(() => []), // MX record
      resolveTxtPromise(hostname).catch(() => []), // TXT record
      resolveNsPromise(hostname).catch(() => []), // NS record
      resolveCnamePromise(hostname).catch(() => []), // CNAME record
      resolveSoaPromise(hostname).catch(() => []), // SOA record
      resolveSrvPromise(hostname).catch(() => []), // SRV record
      resolvePtrPromise(hostname).catch(() => []), // PTR record
    ]);

    return {
      A: a,
      AAAA: aaaa,
      MX: mx,
      TXT: txt,
      NS: ns,
      CNAME: cname,
      SOA: soa,
      SRV: srv,
      PTR: ptr,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
