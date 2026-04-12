#!/bin/sh
chown -R nextjs:nodejs /data/uploads 2>/dev/null || true
exec su-exec nextjs node server.js
