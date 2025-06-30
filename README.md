# Agile Sprint Capacity Planner

A browser-based capacity planning tool that integrates with Asana to visualize and manage team capacity across Agile sprints. Built with vanilla HTML, CSS, and JavaScript for easy deployment and customization.

## Features

- **Asana Integration**: Sync directly with your Asana projects using personal access tokens
- **Capacity Visualization**: Interactive bar charts showing team member capacity levels
- **T-shirt Size Mapping**: Automatic conversion of story points to capacity days (XS=1, S=2, M=5, L=8, XL=10)
- **15% Capacity Buffer**: Automatically applies a 15% buffer to account for meetings, interruptions, and unexpected work
- **Editable Available Days**: Each team member can edit their available days (out of 30) directly in the capacity chart
- **Support Tracking**: Track and manage support needs for team members
- **Setup Guide**: Built-in popup guide with step-by-step instructions for configuration
- **Persistent Data**: All user inputs are saved locally in the browser
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: WCAG 2.2 AA compliant with proper ARIA labels and keyboard navigation

## Quick Start

### 1. Get Your Asana Personal Access Token

1. Go to [Asana Developer Console](https://app.asana.com/0/developer-console)
2. Click "Create new personal access token"
3. Give it a name (e.g., "Capacity Planner")
4. Copy the generated token (you'll only see it once!)

### 2. Find Your Project ID

1. Open your Asana project in the browser
2. Look at the URL: `https://app.asana.com/0/PROJECT_ID/list`
3. Copy the PROJECT_ID number

### 3. Configure the Tool

1. Press **Ctrl+Shift+A** to open the admin configuration panel
2. Enter your Asana personal token and project ID
3. Click "📖 Setup Guide" for detailed instructions

### 4. Deploy to Vercel

1. Fork or clone this repository
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory
4. Follow the prompts to deploy

## Usage Guide

### Capacity Chart Tab

1. **Configuration Section**:
   - Set your sprint number and duration (default: 30 days)
   - Enter your Asana personal token and project ID
   - Click "Sync with Asana" to fetch data

2. **Capacity Table**:
   - View each team member's capacity percentage (with 15% buffer applied)
   - Edit available days for each person (out of 30 sprint days)
   - Add support needs in the last column
   - Status is automatically calculated:
     - 🟢 Under Capacity (<90%)
     - 🟡 At Capacity (90-105%)
     - 🔴 Over Capacity (>105%)

3. **Bar Chart**:
   - Visual representation of team capacity
   - Hover over bars for details
   - Color-coded by capacity status

### Support Overview Tab

- **Needs Support**: Team members who have support notes
- **Under Capacity**: Team members below 90% capacity who can help others

## T-shirt Size Mapping

The tool automatically converts Asana task sizes to capacity days:

| Size | Days | Description |
|------|------|-------------|
| XS   | 1    | Very small task |
| S    | 2    | Small task |
| M    | 5    | Medium task (default) |
| L    | 8    | Large task |
| XL   | 10   | Extra large task |

## Capacity Calculation

The tool applies a **15% buffer** to account for:
- Team meetings and standups
- Unexpected interruptions
- Context switching
- Administrative tasks

**Formula**: `Capacity % = (Total Story Points / (Available Days × 0.85)) × 100`

## How It Works

### Data Flow

1. **Asana API Call**: Fetches tasks from your specified project
2. **Task Processing**: Extracts assignee, task name, and t-shirt size
3. **Capacity Calculation**: Converts sizes to days, applies 15% buffer, and calculates percentages
4. **Local Storage**: Saves all user inputs for persistence
5. **Visualization**: Updates table and charts in real-time

### Finding T-shirt Sizes

The tool looks for t-shirt sizes in this order:
1. Custom fields with "t-shirt", "size", or "story point" in the name
2. Task notes containing XS, S, M, L, or XL
3. Defaults to "M" (5 days) if no size is found

## Setup Instructions

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/coelcreates/capacityplanner.git
   cd capacityplanner
   ```

2. Open `home.html` in your browser or serve it locally:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. Navigate to `http://localhost:8000`

### Vercel Deployment

1. **Automatic Deployment** (Recommended):
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically deploy on every push

2. **Manual Deployment**:
   ```bash
   npm i -g vercel
   vercel
   ```

## Customization

### Modifying T-shirt Size Mapping

Edit the `TSHIRT_SIZES` constant in the JavaScript:

```javascript
const TSHIRT_SIZES = { 
  'XS': 1, 
  'S': 2, 
  'M': 5, 
  'L': 8, 
  'XL': 10,
  'XXL': 13  // Add custom sizes
};
```

### Changing Capacity Thresholds

Modify the capacity calculation in `getCapacityStatus()`:

```javascript
function getCapacityStatus(percent) {
  if (percent < 90) return { text: 'UNDER CAPACITY', color: '#22c55e', bg: '#e6fbe6' };
  if (percent <= 105) return { text: 'AT CAPACITY', color: '#ffc107', bg: '#fffbe6' };
  return { text: 'OVER CAPACITY', color: '#dc3545', bg: '#ffeaea' };
}
```

### Adjusting the Buffer Percentage

To change the 15% buffer, modify the `calculateCapacityPercentage()` function:

```javascript
function calculateCapacityPercentage(total, available) {
  const bufferPercentage = 0.15; // 15% buffer
  const bufferedAvailable = available * (1 - bufferPercentage);
  return ((total / bufferedAvailable) * 100).toFixed(1);
}
```

## Security Considerations

- **Personal Tokens**: Never commit your Asana token to version control
- **Local Storage**: Data is stored locally in the browser
- **CORS**: Asana API calls are made directly from the browser
- **HTTPS**: Always use HTTPS in production

## Troubleshooting

### Common Issues

1. **"Project not found" Error**:
   - Verify your project ID is correct
   - Ensure your token has access to the project

2. **"No tasks found"**:
   - Check that tasks are assigned to team members
   - Verify the project contains tasks

3. **T-shirt sizes not detected**:
   - Add custom fields to your Asana project
   - Include size information in task notes

4. **Data not persisting**:
   - Check browser localStorage settings
   - Ensure cookies are enabled

### Debug Mode

Open browser developer tools (F12) and check the Console tab for detailed error messages.

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Open an issue on GitHub with detailed steps to reproduce

---

**Note**: This tool is designed for internal team use. Always follow your organization's security policies when handling access tokens and project data. 