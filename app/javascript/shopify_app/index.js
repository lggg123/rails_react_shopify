require('./shopify_app')
require('./flash_messages')

import createApp from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';

const apiKey = process.env.SHOPIFY_API_KEY;
const redirectUri = 'http://e312-96-74-112-73.ngrok.io';
const permissionUrl = `https://${host}/admin/oauth/authorize?client_id=${apiKey}&scope=read_products,read_content&redirect_uri=${redirectUri}`;

// If the current window is the 'parent', change the URL by setting location.href
if (window.top == window.self) {
  window.location.assign(permissionUrl);

  // If the current window is the 'child', change the parent's URL with Shopify App Bridge's Redirect action
} else {
  const app = createApp({
    apiKey: apiKey,
    host: host
  });

  Redirect.create(app).dispatch(Redirect.Action.REMOTE, permissionUrl);
}
