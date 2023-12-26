const Credential = require("../models/credentialModel");
const Service = require("../models/serviceModel");
const jwt = require("jsonwebtoken");


//TODO: update search to include credentials as a new endpoint
const fetch_service_credentials = async (req, res) => {
    try {
        const { name, user } = req.body;

        if (!name || !user) {
            return res.status(400).json({ success: false, info: "name or user is missing" });
        }
        let service = await Service.findOne({ name, user });

        if (!service) {
            return res.status(404).json({ success: false, info: "service not found" });
        }

        const servId = service._id;
        let credentials = await Credential.find({ service: servId });

        res.status(200).json({
            success: true,
            info: {
                service_name: service.name,
                service_descr: service.description,
                credentials: credentials.map((cred) => {
                    const decodedToken = jwt.verify(cred.cred_value, process.env.SECRET);
                    return {
                        cred_type: decodedToken.cred_type,
                        cred_value: decodedToken.cred_value,
                    };
                }),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, info: "unable to fetch credentials" });
    }
};

const fetch_service_credentials_by_type = async (req, res) => {
    try {
        const { name, user, cred_type } = req.body;

        if (!name || !user || !cred_type) {
            return res.status(400).json({ success: false, info: "name, user, or cred_type is missing" });
        }
        let service = await Service.findOne({ name, user });

        if (!service) {
            return res.status(404).json({ success: false, info: "service not found" });
        }

        const servId = service._id;
        let credentials = await Credential.find({ service: servId, cred_type });

        res.status(200).json({
            success: true,
            info: {
                service_name: service.name,
                service_descr: service.description,
                credentials: credentials.map((cred) => {
                    const decodedToken = jwt.verify(cred.cred_value, process.env.SECRET);
                    return {
                        cred_type: decodedToken.cred_type,
                        cred_value: decodedToken.cred_value,
                    };
                }),
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, info: "unable to fetch credentials" });
    }
};



const add_credentials = async (req, res) => {
    try {
        const { service, cred_type, cred_value } = req.body;

        if (!service || !cred_type || !cred_value) {
            return res.status(400).json({ success: false, info: "all fields are required" });
        }

        const serv = await Service.findOne({ _id: service });

        if (!serv) {
            return res.status(404).json({ success: false, info: "service not found" });
        }

        const token = jwt.sign({ cred_type, cred_value }, process.env.SECRET);

        const cred = await Credential.create({ service, cred_type, cred_value: token });

        if (cred) {
            return res.status(200).json({ success: true, info: "credentials added successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, info: "unable to add credentials" });
    }
}





const deletecredential = async (req, res) => {
    try {
      const { id } = req.body;
      const deletedcredential = await Credential.findByIdAndDelete(id);
      if (!deletedcredential) {
        return res.status(404).json({ message: "credential not found" });
      }
      return res.status(200).json({ message: "credential deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete credential" });
    }
  };

module.exports = { fetch_service_credentials, add_credentials, deletecredential,fetch_service_credentials_by_type };