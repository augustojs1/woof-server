<h1 align="center"> 
	Woof Server
</h1>

<h3 align="center"> 
	Non-Functional Requirements
</h3>

- [x] Woof Server should be developed using the following stack: Node.js, Nest.js, TypeScript, PostgreSQL and Docker.
- [ ] Docker container for the database.
- [ ] Docker container for the application.
- [ ] Create Github documentaion.
- [ ] Create Swagger REST API documentation.
- [ ] Implement security configuration: SQL Injection, XSS Protection, Security Headers, Rate limiting, HPP & CORS etc.
- [ ] Should include unit and integration tests.
- [ ] Implement server configuration: Nginx, SSL, Domain, PM2 etc.
- [ ] Create basic CI/CD and Github Actions pipeline.
- [ ] Should be deployed to Amazon AWS EC2.
- [ ] Should use AWS S3 to store static files.

<h3 align="center"> 
	Functional Requirements
</h3>

### #Authentication

- [x] Users should be able to sign up.
- [x] Users should be able to sign in.
- [x] Users should be able to logout.
- [x] Users should be able to refresh their auth token.
- [ ] Users should be able to reset their password trough email.

### #Posts

- [x] Users should be able to post text content.
- [ ] Users should be able to post media content.
- [x] Users should be able to like posts.
- [ ] Users should be able to remove like from a post.
- [ ] User should see wether they already liked a post.
- [ ] Users should be able to share posts.
- [ ] User should see wether they already shared a post.
- [ ] Users should be able to save a post.
- [ ] User should see wether they already saved a post.
- [ ] Users should be able to set the post to public or followers only.

### #Follows

- [x] Users should be able to follow another user.
- [x] Users should be able to unfollow another user.
- [x] User should be able to see who follows him.
- [x] Users should be able see who they follow.
- [x] Users should be able to see who another user follows.

### #Replies

- [x] Users should be able to reply to post.
- [x] Users should be able to like a reply.
- [x] Users should be able to remove like from a reply.
- [ ] Users should be able to reply with image.
- [ ] Users should be able to see wether they liked a reply.
- [x] Users should be able to delete their own reply.
- [x] Users should be able to see all the replies of a post.

### #Users

- [ ] Users should be able to edit their avatar.
- [ ] Users should be able to edit their bio.
- [ ] Users should be able to edit their profile name.
- [ ] Users should be able to check posts they saved.
- [ ] Users can filter only posts of another user on a profile.
- [ ] Users can filter only liked posts of another user on a profile.
- [ ] Users can filter only posts with media of another user on a profile.
- [ ] Users can check another user followers.
- [ ] Users can check who another user is following.

### #Files

- [ ] Users should be able to upload image file.

### #Email

- [ ] Users should confirm their account trough email.
- [ ] Users should reset their password trough email.
