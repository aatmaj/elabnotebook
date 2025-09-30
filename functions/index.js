// This is a placeholder for your Cloud Functions.
// You will need to deploy this folder to Firebase using the Firebase CLI.

const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const {log} = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

/**
 * Cloud Function: updateProjectStatus
 * Trigger: On write/update to any document in the 'experiments' collection.
 * Logic: Reads the experiment's outcome and project reference, then updates
 *        the corresponding project's current_milestone based on predefined rules.
 */
exports.updateProjectStatus = onDocumentWritten("experiments/{experimentId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        log("No data associated with the event");
        return;
    }
    const data = snapshot.after.data();
    
    const projectRef = data.project_ref;
    const outcome = data.outcome;

    if (!projectRef || !outcome) {
        log("Experiment missing 'project_ref' or 'outcome'. Exiting function.", {
            docId: snapshot.after.id,
        });
        return;
    }

    log(`Processing outcome for project: ${projectRef}`);
    
    const firestore = getFirestore();
    const projectDocRef = firestore.collection('projects').doc(projectRef);

    let newMilestone = null;

    // --- Predefined Rules ---
    // This is a simplified example. A real implementation would be more robust.
    if (outcome.toLowerCase().includes("successful dissolution")) {
        newMilestone = "BE"; // Advance to Bio-Equivalence
    } else if (outcome.toLowerCase().includes("formulation complete")) {
         newMilestone = "BE";
    } else if (outcome.toLowerCase().includes("initial screening positive")) {
         newMilestone = "Formulation";
    }
    // Add more rules as needed...

    if (newMilestone) {
        try {
            await projectDocRef.update({ current_milestone: newMilestone });
            log(`Successfully updated project ${projectRef} to milestone: ${newMilestone}`);
        } catch (error) {
            log(`Error updating project ${projectRef}:`, error);
        }
    } else {
        log(`No milestone update rule matched for outcome: "${outcome}"`);
    }
});
