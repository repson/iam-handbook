export const categoryIds = ['fundamentals', 'identity-modeling', 'architecture', 'processes', 'capabilities', 'patterns', 'use-cases', 'standards'] as const;
export const categories = [
  { id: 'fundamentals', name: 'Fundamentals', icon: 'book', description: 'Build a shared vocabulary. Understand identities, authentication, authorization, and the principles behind access.' },
  { id: 'identity-modeling', name: 'Identity modeling', icon: 'identity', description: 'Describe people, workloads, accounts, attributes, and the relationships that connect them.' },
  { id: 'architecture', name: 'Architecture', icon: 'layers', description: 'See how identity providers, directories, policy engines, and applications fit together.' },
  { id: 'processes', name: 'Processes', icon: 'cycle', description: 'Follow an identity from onboarding to offboarding. Make access requests and reviews repeatable.' },
  { id: 'capabilities', name: 'Capabilities', icon: 'grid', description: 'Map the building blocks of an IAM program, from governance to privileged access.' },
  { id: 'patterns', name: 'Design patterns', icon: 'nodes', description: 'Explore reusable approaches to access control, federation, and application integration.' },
  { id: 'use-cases', name: 'Use cases', icon: 'terminal', description: 'Connect the concepts to everyday scenarios for employees and service identities.' },
  { id: 'standards', name: 'Standards & protocols', icon: 'code', description: 'Know what OAuth, OpenID Connect, SAML, SCIM, and WebAuthn actually solve.' },
] as const;
