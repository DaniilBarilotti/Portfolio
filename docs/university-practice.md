# University practice — PromptGuard frontend

**Student:** Daniil Barilotti, V. N. Karazin Kharkiv National University, cybersecurity.  
**Practice host:** DevBrother, Kharkiv.  
**Period:** 29 June–19 July 2026, as recorded in the existing practice presentation.  
**Contribution:** frontend of the team PromptGuard project, branch `feat/react-chat-ui`.

## Work represented in the portfolio

- React chat interface and Markdown rendering.
- Clean, suspicious and blocked response states.
- Suspicious-fragment highlighting and attack metadata.
- Incident list and Red Team example prompts.
- API integration layer, loading/error handling, theme and language controls.

The Node proxy and Python detector are team components. The personal contribution is the frontend; the standalone portfolio demo cycles predefined mock responses and does not detect attacks. UI feedback is not a substitute for server-side enforcement.

## Interview walkthrough

Explain how a message reaches the proxy, how an HTTP 403 result is normalized, and how the UI shows its verdict and incident. Distinguish the mock demo from the integrated team system. Discuss API contracts and handling service errors.

## Source materials

Existing practice presentation material titled PromptGuard, identifying the university practice, host, dates, stack and functional requirements. Public frontend repository: https://github.com/DaniilBarilotti/promptguard-ui . No university grades, internal credentials or private team source are included.
