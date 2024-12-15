// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FlowSeekerPlatform is ERC721URIStorage, Ownable {

    uint256 private _userIds = 0;
    uint256 private _jobIds = 0;
    uint256 private _applicationIds = 0;

    enum UserType {
        JobSeeker,
        Refferal,
        Recruiter
    }

    function getUserTokenId(address _user) public view returns (uint256) {
        for (uint256 i = 1; i <= _userIds; i++) {
            if (ownerOf(i) == _user) {
                return i;
            }
        }
        revert("No profile found for this address");
    }

    enum JobStatus {
        Open,
        Closed,
        Filled
    }

    struct UserProfile {
        UserType userType;
        string username;
        string email;
        string bio;
        string profession;
        string[] skills;
        uint256 joinedAt;
    }

    struct Job {
        uint256 id;
        address recruiter;
        string title;
        string description;
        string[] requiredSkills;
        uint256 salary;
        uint256 createdAt;
        JobStatus status;
    }

    struct JobApplication {
        uint256 id;
        uint256 jobId;
        uint256 userProfileTokenId;
        address applicant;
        string message;
        uint256 appliedAt;
        bool accepted;
    }

    mapping(uint256 => UserProfile) public userProfiles;
    mapping(uint256 => Job) public jobs;
    mapping(uint256 => JobApplication) public jobApplications;

    event UserProfileCreated(address indexed user, uint256 tokenId, string username, UserType userType);
    event JobCreated(uint256 indexed jobId, address indexed recruiter);
    event JobApplied(uint256 indexed jobId, uint256 indexed applicationId, address indexed applicant);    

    constructor() ERC721("FlowSeekerPlatform", "FSP") Ownable(msg.sender) {}

    function createUserProfile(
        UserType _userType,
        string memory _username,
        string memory _email,
        string memory _bio,
        string memory _profession,
        string[] memory _skills,
        string memory _tokenURI
    ) public returns (uint256) {
        _userIds += 1;
        uint256 newTokenId = _userIds;

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        userProfiles[newTokenId] = UserProfile({
            userType: _userType,
            username: _username,
            email: _email,
            bio: _bio,
            profession: _profession,
            skills: _skills,
            joinedAt: block.timestamp
        });

        emit UserProfileCreated(msg.sender, newTokenId, _username, _userType);
        return newTokenId;
    }

    function createJob(
        string memory _title,
        string memory _description,
        string[] memory _requiredSkills,
        uint256 _salary
    ) public returns (uint256) {
        uint256 userTokenId = getUserTokenId(msg.sender);
        require(
            userProfiles[userTokenId].userType == UserType.Recruiter || 
            userProfiles[userTokenId].userType == UserType.Refferal, 
            "Only recruiters or referrals can create jobs"
        );

        _jobIds += 1;
        uint256 newJobId = _jobIds;

        jobs[newJobId] = Job({
            id: newJobId,
            recruiter: msg.sender,
            title: _title,
            description: _description,
            requiredSkills: _requiredSkills,
            salary: _salary,
            createdAt: block.timestamp,
            status: JobStatus.Open
        });

        emit JobCreated(newJobId, msg.sender);
        return newJobId;
    }

    function ApplyToJob(uint256 _jobId, string memory _message) public returns (uint256) {
        require(_jobId > 0 && _jobId <= _jobIds, "Invalid job ID");
        require(jobs[_jobId].status == JobStatus.Open, "Job is not open or already closed");

        uint256 userTokenId = getUserTokenId(msg.sender);
        require(userProfiles[userTokenId].userType == UserType.JobSeeker, "Only JobSeeker can Apply");

        _applicationIds += 1;
        uint256 newApplicationId = _applicationIds;

        jobApplications[newApplicationId] = JobApplication({
            id: newApplicationId,
            jobId: _jobId,
            userProfileTokenId: userTokenId,
            applicant: msg.sender,
            message: _message,
            appliedAt: block.timestamp,
            accepted: false
        });

        emit JobApplied(_jobId, newApplicationId, msg.sender);
        return newApplicationId;
    }

    function getUserProfile(uint256 _tokenId) public view returns (UserProfile memory) {
        require(_tokenId > 0 && _tokenId <= _userIds, "Profile does not exists");
        ownerOf(_tokenId); // Jika token tidak ada, ini akan melempar error
        return userProfiles[_tokenId];
    }

    function getJobList(uint256 _jobId) public view returns (Job memory) {
        require(_jobId > 0 && _jobId <= _jobIds, "Invalid Job ID");
        return jobs[_jobId];
    }
}