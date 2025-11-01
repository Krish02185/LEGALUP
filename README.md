# Legal Uplifter - AI-Powered Legal Document Analysis Platform

A modern web application that uses AI to analyze, summarize, and extract key insights from legal documents. Perfect for business professionals, citizens, and students who need to understand complex legal language quickly.

## Features

- **Intelligent Document Analysis**: Upload PDFs and images for instant AI-powered analysis
- **Smart Summarization**: Get clear, concise summaries of complex legal documents
- **Pros & Cons Analysis**: Understand advantages and disadvantages of each agreement
- **Risk Assessment**: Identify critical, high, medium, and low-severity risks
- **Key Highlights**: Automatically detect important clauses and terms
- **AI Chat Assistant**: Ask questions about your documents and get instant answers
- **Category-Based Analysis**: Personalized insights for Business, Citizen, or Student documents
- **Document History**: Track all your analyzed documents with metadata
- **Export Capabilities**: Download analysis as PDF or copy to clipboard
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui components
- **PDF Processing**: PDF.js for client-side PDF text extraction
- **AI Analysis**: Intelligent keyword extraction and pattern recognition
- **API Routes**: Next.js API routes for backend processing
- **Icons**: Lucide React for beautiful icons

## Project Structure

\`\`\`
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles and design tokens
│   ├── dashboard/            # Dashboard routes
│   │   └── page.tsx          # Dashboard page
│   └── api/                  # Backend API routes
│       ├── analyze/          # Document analysis endpoints
│       ├── chat/             # Chat assistant endpoints
│       ├── documents/        # Document management
│       ├── health/           # Health check endpoint
│       └── upload-document/  # Document upload handler
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── document-uploader.tsx # PDF upload component
│   ├── analysis-results.tsx  # Analysis display component
│   ├── chat-assistant.tsx    # Floating chat widget
│   ├── category-selector.tsx # User type selector
│   ├── export-analysis.tsx   # Export functionality
│   ├── document-history.tsx  # Recent documents list
│   ├── quick-summary.tsx     # Quick summary card
│   └── pdf-viewer.tsx        # PDF preview component
└── lib/
    ├── pdf-analyzer.ts       # Core analysis engine
    ├── document-utils.ts     # Utility functions
    └── rate-limiter.ts       # API rate limiting
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:3000 in your browser

## Usage

### Analyzing a Document

1. Navigate to the dashboard
2. Select your user category (Business, Citizen, or Student)
3. Upload a PDF or image file (drag & drop or click to browse)
4. Wait for AI analysis to complete
5. Review the analysis results with tabs for:
   - Summary overview
   - Pros and cons
   - Key points and highlights
   - Risk assessment
   - Obligations

### Using the Chat Assistant

- Click on the floating chat bubble in the bottom right
- Ask any question about your analyzed document
- The AI assistant provides context-aware responses
- Copy responses to clipboard for easy sharing

### Exporting Analysis

- Click the "Export & Share" section
- Choose PDF download, copy to clipboard, or share
- Exported files include full analysis and all sections

## API Endpoints

### Analysis

- `POST /api/analyze/v2` - Analyze document and extract insights
- `POST /api/analyze` - Legacy analysis endpoint

### Documents

- `GET /api/documents` - List all analyzed documents
- `POST /api/documents` - Save document analysis
- `GET /api/documents/[id]` - Get specific document
- `DELETE /api/documents/[id]` - Delete document

### Chat

- `POST /api/chat` - Send message to AI assistant

### Utilities

- `GET /api/health` - Health check endpoint
- `POST /api/upload-document` - Upload and process documents

## Document Analysis Features

### Summary
- Comprehensive overview of the document
- Key context and purpose
- Important dates and parties

### Key Points
- Extracted important clauses and terms
- Grouped by importance level (High, Medium, Low)
- Actionable information highlighted

### Highlights
- Critical clauses automatically detected
- Explanations for why each highlight matters
- Risk indicators for attention-required items

### Pros & Cons
- Advantages clearly listed
- Disadvantages flagged with impact levels
- Balanced perspective for decision-making

### Risk Assessment
- Severity levels: Critical, High, Medium, Low
- Detailed explanation of each risk
- Recommendations for mitigation

### Obligations
- All parties' responsibilities listed
- Timeline and deadline information
- Compliance requirements

## Design System

### Color Palette

- **Primary**: Deep Purple (#6B5B95) - Main brand color for CTAs
- **Accent**: Neon Teal (#20D9D9) - Highlights and interactive elements
- **Background**: Black (#0A0A0A) - Dark professional aesthetic
- **Secondary**: Dark Gray (#1A1A1A) - Supporting elements
- **Neutral**: Grays and whites for text and borders

### Typography

- **Headings**: Geist font family
- **Body**: Geist sans-serif for readability
- **Mono**: Geist Mono for code and technical content

### Components

All UI components follow consistent design patterns:
- Hover states with accent color transitions
- Smooth animations and transitions
- Clear visual hierarchy
- Accessible color contrast ratios
- Responsive design for all screen sizes

## Features Coming Soon

- User authentication and accounts
- Document storage and management
- Advanced AI models for deeper analysis
- Multi-language support
- Collaborative document review
- Integration with legal databases
- Real-time collaboration tools
- Advanced security and encryption

## Performance

- Client-side PDF processing (no file upload to servers)
- Optimized image loading and caching
- Code splitting and lazy loading
- Minimal bundle size
- Fast API response times
- Rate limiting for API protection

## Security

- Input validation on all endpoints
- CORS protection
- XSS prevention headers
- Secure file handling
- Rate limiting to prevent abuse
- No sensitive data logging

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this for personal or commercial projects

## Support

For issues, questions, or feature requests, please open an issue on GitHub or contact support.

---

Built with ❤️ using v0 and Next.js
