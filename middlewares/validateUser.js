const validateUser = (req, res, next) => {
    const { name, email, phone, role, country } = req.body;

    console.log("Validating User Data");

    console.log(`Validating User Name : ${name}`);

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        console.log(`Name is not valid : ${name}`);
        return res.status(400).json({ error: `Name cannot be empty : ${name}` });
    }
    console.log(`No error in Name : ${name}`);

    console.log(`Validating User Email : ${email}`);

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        console.log(`Email is not valid : ${email}`);
        return res.status(400).json({ error: `No valid email : ${email}` })
    }
    console.log(`No error in Email : ${email}`);

    console.log(`Validating User Phone: ${phone}`);

    if (!phone || typeof phone !== 'string' || !/^[0-9]{10}$/.test(phone)) {
        console.log(`Phone is not valid : ${phone}`);
        return res.status(400).json({ error: `Phone Error : ${phone}` })
    }
    console.log(`No error in Phone : ${phone}`);

    console.log(`Validating User Role : ${role}`);

    if (!role || typeof role !== 'string' || role.trim().length === 0) {
        console.log(`Role is invalid : ${role}`);
        return res.status(400).json({ error: `role cannot be empty : ${role}` })
    }
    console.log(`No error in Role : ${role}`);

    console.log(`Validating User Country : ${country}`);

    if (!country || typeof country !== 'string' || country.trim().length === 0) {
        console.log(`Name is not valid : ${country}`);
        return res.status(400).json({ error: `country cannot be empty : ${country}` })
    }

    console.log(`No error in Country : ${country}`);

    console.log(`Validate Successfull`);

    req.body.name = name.trim();
    req.body.email = email.trim();
    req.body.phone = phone.trim();
    req.body.role = role.trim();
    req.body.country = country.trim();
    console.log(`Name : ${name}`);
    console.log(`Email : ${email}`);
    console.log(`Phone : ${phone}`);
    console.log(`Country : ${country}`);

    next();
}

module.exports = validateUser;