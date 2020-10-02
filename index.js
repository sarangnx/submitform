const SES = require('aws-sdk').SES;
const xss = require('xss');
const ses = new SES({ region: 'us-east-1' });

/**
 * Handle User form submissions.
 */
exports.submit = async (req, res) => {
    // Set CORS headers for preflight requests
    res.set('Access-Control-Allow-Origin', 'https://srng.dev');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        return res.status(204).send('');
    }
    // END CORS

    const { name, email, message } = req.body;

    // Quick Checking for all params
    if (!name) return res.status(400).json({ message: 'Name Required.' });
    if (!email) return res.status(400).json({ message: 'Email Required.' });
    if (!message) return res.status(400).json({ message: 'Message Required.' });

    // Prepare Email
    const params = {
        Destination: {
            ToAddresses: ['sarangnkd@gmail.com']
        },
        Source: 'form@srng.dev',
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: xss(name)
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                        <div>
                            <div><b>Name: </b> ${xss(name)}</div>
                            <div><b>Email: </b> ${xss(email)}</div>
                            <div><b>Message: </b> ${xss(message)}</div>
                        </div>
                    `
                }
            }
        }
    };

    // Send Mail
    try {
        const response = await ses.sendEmail(params).promise();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Form was not submitted' });
    }

    res.json({ message: `Thank you! I'll get back to you soon.` });
};
