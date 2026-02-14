import { industries } from "@/data/industries";
import OnboardingForm from "./components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";

const OnboardingPage = async () => {

    const { isOnboarded } = await getUserOnboardingStatus();

    if (isOnboarded) {
        redirect("/dashboard");
    }
    return (
        <main>
            <OnboardingForm industries={industries} />
        </main>
    )
}

export default OnboardingPage;
