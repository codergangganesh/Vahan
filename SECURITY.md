# Security Policy

## ⚠️ Important Security Notice

On September 27, 2025, this repository contained exposed Supabase credentials in the `.env` file. These credentials have been:

1. Removed from the git history
2. Invalidated in Supabase
3. Replaced with placeholder values

If you have cloned this repository before September 27, 2025, please pull the latest changes to get the updated `.env` file with placeholder values.

## Supported Versions

The following versions of this project are currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to [security-email] with a detailed description of the issue.

All security vulnerabilities will be promptly addressed.

## Security Best Practices

### Environment Variables
- Never commit sensitive information like API keys, database credentials, or other secrets to a public repository
- Use environment variables for all sensitive configuration
- Include `.env` in your `.gitignore` file
- Use `.env.local` for actual credentials (this is gitignored)

### Credential Management
- Regularly rotate your API keys and credentials
- Use strong, unique passwords for all accounts
- Enable two-factor authentication where available
- Store credentials securely using a password manager or secret management service

### Git Security
- Always review changes before committing
- Use descriptive commit messages
- Never push sensitive information to public repositories
- Regularly audit your repository for exposed secrets

### Access Control
- Limit repository access to authorized team members only
- Use role-based access controls where possible
- Regularly review and update access permissions
- Remove access for team members who no longer need it

## Incident Response

In the event of a security incident:

1. Immediately rotate any exposed credentials
2. Notify all team members
3. Document the incident and response actions
4. Review and update security practices to prevent similar incidents
5. Consider notifying users if their data may have been compromised