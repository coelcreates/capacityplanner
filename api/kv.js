import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { action, key, data, sprintName } = req.body;

    switch (action) {
      case 'get':
        // Get data for a specific key
        const value = await kv.get(key);
        return res.status(200).json({ success: true, data: value });

      case 'set':
        // Set data for a specific key
        await kv.set(key, data);
        return res.status(200).json({ success: true, message: 'Data saved successfully' });

      case 'getCapacityData':
        // Get capacity data for a specific sprint
        const capacityKey = `capacity:${sprintName}`;
        const capacityData = await kv.get(capacityKey);
        return res.status(200).json({ success: true, data: capacityData || {} });

      case 'setCapacityData':
        // Save capacity data for a specific sprint
        const capacityKeyToSet = `capacity:${sprintName}`;
        await kv.set(capacityKeyToSet, data);
        return res.status(200).json({ success: true, message: 'Capacity data saved successfully' });

      case 'getSprintList':
        // Get list of all sprints
        const sprintKeys = await kv.keys('capacity:*');
        const sprints = sprintKeys.map(key => key.replace('capacity:', ''));
        return res.status(200).json({ success: true, data: sprints });

      case 'delete':
        // Delete data for a specific key
        await kv.del(key);
        return res.status(200).json({ success: true, message: 'Data deleted successfully' });

      default:
        return res.status(400).json({ success: false, error: 'Invalid action' });
    }
  } catch (error) {
    console.error('KV API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
} 