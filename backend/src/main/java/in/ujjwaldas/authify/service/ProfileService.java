package in.ujjwaldas.authify.service;

import in.ujjwaldas.authify.io.ProfileRequest;
import in.ujjwaldas.authify.io.ProfileResponse;

public interface ProfileService {
    ProfileResponse createProfile(ProfileRequest request);
    ProfileResponse getProfile(String email);

    void sendResetOtp(String email);
    void resetPassword(String email, String otp, String newPassword);


    void sendOtp(String email);

    void verifyOtp(String email, String otp);
}
