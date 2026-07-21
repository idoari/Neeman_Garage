export default async function handler(req, res) {
    // הגדרת כותרות CORS כדי ש-GitHub Pages או כל אתר יוכל לפנות לפונקציה
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { carNumber } = req.query;

    if (!carNumber) {
        return res.status(400).json({ error: 'Missing carNumber query parameter' });
    }

    const resourceId = '0537061d-882d-43e7-a1f9-9210f6525857';
    const govUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceId}&q=${encodeURIComponent(carNumber)}`;

    try {
        const response = await fetch(govUrl);
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from gov API', details: error.message });
    }
}
