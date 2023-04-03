const { InstituteDetail } = require("../models");

const createTokenUser = async(user) => {
    var tokenUser = {
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "isVerified": user.isVerified,
    };

    if (tokenUser.role === "institute") {
        const institute_detail = await InstituteDetail.findOne({
            where: { userId: user.userId },
        });

        tokenUser.instituteName = institute_detail.instituteName;
    }
    return tokenUser;
};

module.exports = createTokenUser;