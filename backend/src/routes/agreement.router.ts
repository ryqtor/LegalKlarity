// agreement router.ts
import { Router } from 'express';
import {
    agreementSummary,
    enhancedAgreementAnalysis,
    processAgreement,
    uploadFile,
} from '../controllers/agreement.controller';
import { upload } from '../middlewares/multer';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.route("/agreement-summary").post(authenticate, upload.fields([{ name: "file", maxCount: 1 }]), agreementSummary)

router.route("/enhanced-analysis").post(upload.fields([{ name: "file", maxCount: 1 }]), enhancedAgreementAnalysis)

router.route("/agreement-process").post(authenticate, processAgreement)

// upload file
router.route("/upload").post(authenticate, upload.fields([{ name: "file", maxCount: 1 }]), uploadFile);

export default router;