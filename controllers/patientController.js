exports.checkBPJS = (req, res) => {
    // Logic to check BPJS membership
    res.send('BPJS membership checked');
};

exports.registerPatient = (req, res) => {
    // Logic to register patient
    res.send('Patient registered');
};

exports.visitHistory = (req, res) => {
    // Logic to fetch visit history
    res.send('Visit history fetched');
};
