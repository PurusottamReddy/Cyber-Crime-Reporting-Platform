import Crime from "../models/Crime.js";
import { cloudinary } from "../configs/cloudinary.js";

export const createCrimeReport = async (req, res) => {
  try {
    const { anonymous, category, title, description, location, related_info, date } = req.body;

    //  Basic field validation
    if (!category || !title || !description || !location || !related_info || !date) {
      return res.json({ success: false, message: "All fields are required" });
    }

    //  File validation (removed explicit check for evidence files)

    //  Upload each file to Cloudinary
    const uploadedFiles = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "crime_evidence",
          resource_type: "auto", // allows images, videos, pdfs, etc.
        });
        uploadedFiles.push(result.secure_url);
      }
    }

    // Handle anonymous reports
    const finalUser = anonymous === "true" ? null : req.user._id;

    // Create report in database
    const crime = await Crime.create({
      user: finalUser,
      anonymous,
      category,
      title,
      description,
      date,
      location,
      related_info,
      evidence: uploadedFiles, // array of URLs
    });

    return res.json({ success: true, crime });
  } catch (error) {
    console.error("Error creating crime report:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Get All Crime Reports 
export const getAllCrimeReports = async (req, res) =>{
    try{
        const reports = await Crime.find().populate("user")
        return res.json({success:true,reports})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

// Get User Crime Reports 
export const getUserCrimeReports = async (req, res) =>{
    try{    
        const reports = await Crime.find({user:req.params.userId}).populate("user")
        return res.json({success:true,reports})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

// Get Crime Report by ID
export const getCrimeReport = async (req,res)=>{
    try{
        const report = await Crime.findById(req.params.crimeId).populate("user")
        if(!report){
            return res.json({success:false,message:"Report not found"})
        }
        return res.json({success:true,report})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

// Update Status
export const updateStatus = async (req,res)=>{
    const {status} = req.body;
    if(!status){
        return res.json({success:false,message:"Status is required"})
    }
    try{
        const crime = await Crime.findById(req.params.crimeId)
        if(!crime){
            return res.json({success:false,message:"Crime not found"})
        }
        crime.status = status;
        await crime.save()
        return res.json({success:true,message:"Status updated successfully"})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }

}


// Delete Crime Report
export const deleteCrimeReport = async(req,res)=>{
    try{
        const crime= await Crime.findById(req.params.crimeId)
        if(!crime){
            return res.json({success:false,message:"Crime not found"})
        }
        await crime.deleteOne()
        return res.status(200).json({success:true,message:"report deleted successfully"})
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}

// Fraud Lookup
export const fraudLookup = async (req,res)=>{
    const {related_info} = req.body;
    if(!related_info){
        return res.json({success:false,message:"Please provide email, phone number, or website"})
    }
    try{
        const crimes = await Crime.find({related_info:{$regex:related_info,$options:"i"}}).populate("user")
        if(crimes.length === 0){
            return res.json({success:false,message:"No crimes found with the provided related information"})
        }
        return res.json({success:true,crimes})
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}
