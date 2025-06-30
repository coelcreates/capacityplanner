# Agile Sprint Capacity Planner

A browser-based capacity planning tool that integrates with Asana to visualize and manage team capacity across Agile sprints. Built with vanilla HTML, CSS, and JavaScript for easy deployment and customization.

## Features

- **Team-Wide Access**: No configuration needed for team members - just enter sprint name and sync
- **Asana Integration**: Automatic sync with your Asana projects using pre-configured settings
- **Smart Project Mapping**: Automatically determines which Asana project to use based on sprint name
- **Capacity Visualization**: Interactive bar charts showing team member capacity levels
- **T-shirt Size Mapping**: Automatic conversion of story points to capacity days (XS=1, S=2, M=5, L=8, XL=9)
- **Support Tracking**: Track and manage support needs for team members
- **Persistent Data**: All user inputs are saved locally in the browser
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: WCAG 2.2 AA compliant with proper ARIA labels and keyboard navigation

## Quick Start

### For Team Members (Daily Use)

1. **Open the app** - No login or configuration needed
2. **Enter Sprint Name** - Type your sprint name (e.g., "Sprint 12", "Q1 Sprint 3")
3. **Click "Sync with Asana"** - Automatically fetches your team's capacity data
4. **Review & Update** - Adjust available days and add support notes as needed

### For Administrators (One-time Setup)

1. **Access Admin Panel**: Press `Ctrl+Shift+A` to open admin configuration
2. **Configure Asana Token**: Enter your Asana personal access token
3. **Set Project Mappings**: Map sprint patterns to Asana project IDs
4. **Hide Admin Panel**: Press `Ctrl+Shift+A` again to hide

## Setup Instructions

### Initial Configuration (Admin Only)

1. **Get Asana Personal Access Token**:
   - Go to [Asana Developer Console](https://app.asana.com/0/developer-console)
   - Click "Create new personal access token"
   - Give it a name (e.g., "Capacity Planner")
   - Copy the generated token

2. **Configure the Tool**:
   - Open the deployed app
   - Press `Ctrl+Shift+A` to open admin panel
   - Enter your Asana token
   - Set up project mappings (see Project Mapping section below)
   - Press `Ctrl+Shift+A` to hide admin panel

3. **Deploy to Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

### Project Mapping

The tool automatically determines which Asana project to use based on the sprint name. Configure mappings in the admin panel:

**Examples:**
- `Sprint *` → Project ID `123456789` (matches all sprints)
- `Q1 Sprint *` → Project ID `987654321` (matches Q1 sprints)
- `Sprint 12` → Project ID `555666777` (exact match)

**Pattern Rules:**
- Use `*` for wildcards
- Patterns are case-insensitive
- More specific patterns take precedence

## Usage Guide

### Daily Workflow

1. **Open the app** in your browser
2. **Enter sprint name** in the "Sprint Name/Number" field
3. **Click "Sync with Asana"** to fetch current data
4. **Review capacity table** showing:
   - Team member capacity percentages
   - Available days (editable)
   - Status indicators (Under/At/Over Capacity)
   - Sprint goals from Asana
   - Support needs (editable)
5. **Update as needed** - All changes save automatically
6. **Switch to Support Overview** tab to see who needs help

### Capacity Status

- 🟢 **Under Capacity** (<90%): Team member can take on more work
- 🟡 **At Capacity** (90-105%): Team member is well-utilized
- 🔴 **Over Capacity** (>105%): Team member may need support

### Support Overview Tab

- **Needs Support**: Team members who have support notes
- **Under Capacity**: Team members below 90% who can help others

## T-shirt Size Mapping

The tool automatically converts Asana task sizes to capacity days:

| Size | Days | Description |
|------|------|-------------|
| XS   | 1    | Very small task |
| S    | 2    | Small task |
| M    | 5    | Medium task (default) |
| L    | 8    | Large task |
| XL   | 9    | Extra large task |

## How It Works

### Data Flow

1. **Sprint Name Input**: User enters sprint name
2. **Project Lookup**: Tool finds matching Asana project using configured mappings
3. **Asana API Call**: Fetches tasks from the determined project
4. **Task Processing**: Extracts assignee, task name, and t-shirt size
5. **Capacity Calculation**: Converts sizes to days and calculates percentages
6. **Local Storage**: Saves all user inputs for persistence
7. **Visualization**: Updates table and charts in real-time

### Finding T-shirt Sizes

The tool looks for t-shirt sizes in this order:
1. Custom fields with "t-shirt", "size", or "story point" in the name
2. Task notes containing XS, S, M, L, or XL
3. Defaults to "M" (5 days) if no size is found

## Admin Functions

### Accessing Admin Panel
- Press `Ctrl+Shift+A` to toggle admin configuration
- Admin panel is hidden by default for team members

### Admin Features
- **Asana Token Management**: Set and update the team's Asana token
- **Project Mapping**: Configure which sprints map to which Asana projects
- **Settings Reset**: Clear all saved data and start fresh

### Security Considerations
- Admin panel is hidden from regular users
- Token is stored locally in browser
- No server-side storage of sensitive data

## Customization

### Modifying T-shirt Size Mapping

Edit the `TSHIRT_SIZES` constant in the JavaScript:

```javascript
const TSHIRT_SIZES = { 
  'XS': 1, 
  'S': 2, 
  'M': 5, 
  'L': 8, 
  'XL': 9,
  'XXL': 13  // Add custom sizes
};
```

### Changing Capacity Thresholds

Modify the capacity calculation in `renderCapacityTable()`:

```javascript
// Current thresholds
if (percent < 90) {
  statusClass = 'status-green';
  statusText = 'Under Capacity';
} else if (percent <= 105) {
  statusClass = 'status-yellow';
  statusText = 'At Capacity';
} else {
  statusClass = 'status-red';
  statusText = 'Over Capacity';
}
```

## Troubleshooting

### Common Issues

1. **"Asana integration not configured"**:
   - Press `Ctrl+Shift+A` to open admin panel
   - Enter your Asana personal token
   - Set up project mappings

2. **"No project mapping found"**:
   - In admin panel, add a mapping for your sprint pattern
   - Use wildcards like "Sprint *" for general matching

3. **"Project not found" Error**:
   - Verify your project ID is correct in admin panel
   - Ensure your token has access to the project

4. **"No tasks found"**:
   - Check that tasks are assigned to team members
   - Verify the project contains tasks

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