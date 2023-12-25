const Service = require("../models/serviceModel");

const fetch_service = async (req, res) => {
  try {
    const service = await Service.find();
    if (service) {
      res.status(200).json({ success: true, info: service });
    } else {
      return res
        .status(400)
        .json({ success: false, info: "No registered service found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, info: "unable to fetch service" });
  }
};

const fetch_user_services = async (req, res) => {
  try {
    const { user } = req.body;
    const service = await Service.find({ user });
    if (service) {
      res.status(200).json({ success: true, info: service });
    } else {
      return res
        .status(400)
        .json({ success: false, info: "No registered service found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, info: "unable to fetch service" });
  }
}

const add_service = async (req, res) => {
  try {
    const { name, description, url, user } = req.body;
    if (!name || !description || !url  || !user) {
      return res
        .status(400)
        .json({ success: false, info: "all fields are required" });
    }
    const service = await Service.create({
      name,
      description,
      url,
      user,
    });

    if (service) {
      return res.status(200).json({ success: true, info: service });
    }

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, info: "unable to add service" });
  }
};

const updateService = async (req, res) => {
    const { id, updatedInfo } = req.body;
  
    try {
      const updatedService = await User.findByIdAndUpdate(id, updatedInfo, {
        new: true,
      });
  
      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }
  
      res.status(200).json(updatedService);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update service info" });
    }
  };
  
  const deleteservice = async (req, res) => {
    try {
      const { id } = req.body;
      const deletedservice = await Service.findByIdAndDelete(id);
      if (!deletedservice) {
        return res.status(404).json({ message: "service not found" });
      }
      return res.status(200).json({ message: "service deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to delete service" });
    }
  };


  const search_services = async (req, res) => {
    try {
        const { query } = req.body;

        // Use the $or operator to search for documents matching any of the specified criteria
        const services = await Service.find({
            $or: [
                { name: { $regex: query, $options: "i" } }, // Match name
                { description: { $regex: query, $options: "i" } }, // Match description
            ],
        });

        res.status(200).json({ success: true, info: services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, info: "An error occurred during the search" });
    }
};


module.exports = {
    fetch_service,
    add_service,
    fetch_user_services,
    updateService,
    deleteservice,
    search_services
}