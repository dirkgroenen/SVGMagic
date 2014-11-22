/*
 * This requests test will send two requests to the SVGMagic API and validate the responsed data for any errors. 
 * The validation only exists out checking if the error variable has been set to true
 */

// constants
var EXIT_SUCCESS = 0,
    EXIT_FAILURE = 1,
    EXIT_ERROR = 2;

// vars
var apiurl = 'http://bitlabs.nl/svgmagic/converter/3/';
var batches = [];

// Build data object for version 3 with a normal and data image
var v3data = "dumpcache=true&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_1.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_2.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_3.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_4.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_5.svg&svgsources[]=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8%2BCjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMTA4IgogICBoZWlnaHQ9IjEwOCIKICAgaWQ9InN2ZzIiCiAgIHZlcnNpb249IjEuMSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC40IHI5OTM5IgogICBzb2RpcG9kaTpkb2NuYW1lPSJOaWV1dyBkb2N1bWVudCAxIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMC43IgogICAgIGlua3NjYXBlOmN4PSI0OTEuODQxNCIKICAgICBpbmtzY2FwZTpjeT0iMjIuNDk3MTMyIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJnMjk5OSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGZpdC1tYXJnaW4tdG9wPSIwIgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMCIKICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIgogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIwIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY%2BCiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8%2BCiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU%2BCiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxhYWcgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwMC4yODU3MSwtNDI0LjA3NjQ3KSI%2BCiAgICA8ZwogICAgICAgaWQ9ImcyOTk5IgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAwLjI4NTcxLDQyNC4wODA0NykiPgogICAgICA8Y2lyY2xlCiAgICAgICAgIGlkPSJjaXJjbGUyOTg3IgogICAgICAgICByPSI1NCIKICAgICAgICAgY3k9IjUzLjk5NTk5OCIKICAgICAgICAgY3g9IjU0IgogICAgICAgICBzb2RpcG9kaTpjeD0iNTQiCiAgICAgICAgIHNvZGlwb2RpOmN5PSI1My45OTU5OTgiCiAgICAgICAgIHNvZGlwb2RpOnJ4PSI1NCIKICAgICAgICAgc29kaXBvZGk6cnk9IjU0IgogICAgICAgICBzdHlsZT0iZmlsbDojYWM5ZDkzIgogICAgICAgICBkPSJNIDEwOCw1My45OTU5OTggQyAxMDgsODMuODE5Mzc1IDgzLjgyMzM3NiwxMDcuOTk2IDU0LDEwNy45OTYgMjQuMTc2NjI0LDEwNy45OTYgMCw4My44MTkzNzUgMCw1My45OTU5OTggMCwyNC4xNzI2MjIgMjQuMTc2NjI0LC0wLjAwNDAwMTYyIDU0LC0wLjAwNDAwMTYyIGMgMjkuODIzMzc2LDAgNTQsMjQuMTc2NjIzNjIgNTQsNTMuOTk5OTk5NjIgeiIgLz4KICAgICAgPGcKICAgICAgICAgaWQ9ImczODEwIj4KICAgICAgICA8cGF0aAogICAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2MiCiAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MC4zO2ZpbGw6IzI0MWYxYztlbmFibGUtYmFja2dyb3VuZDpuZXciCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgICBkPSJNIDMwLjgwMDkwOCw0Ny40MDQ4OTYgNTUuNzE5Nzg1LDM3LjIxNDg3NCA1NS42OTIxNzIsNzAuNzYxMzM5IDMwLjk0MDM0Niw1OS43MzM1MyB6IgogICAgICAgICAgIGlkPSJwYXRoMjk4OSIgLz4KICAgICAgICA8ZwogICAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNjQ0ODkyMSwzLjc3NDA4MjIpIgogICAgICAgICAgIGlkPSJnMzgwNSI%2BCiAgICAgICAgICA8ZwogICAgICAgICAgICAgaWQ9ImczODAxIj4KICAgICAgICAgICAgPHJlY3QKICAgICAgICAgICAgICAgcnk9IjAuMzA4IgogICAgICAgICAgICAgICB5PSI0My41ODI5NTgiCiAgICAgICAgICAgICAgIHg9IjE2LjI4ODk0IgogICAgICAgICAgICAgICBoZWlnaHQ9IjEyLjQxMDcxNCIKICAgICAgICAgICAgICAgd2lkdGg9IjEyLjQxMDcxNCIKICAgICAgICAgICAgICAgaWQ9InJlY3QzMDEwIgogICAgICAgICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDowLjE1NjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1vcGFjaXR5OjA7c3Ryb2tlLWRhc2hhcnJheTpub25lIiAvPgogICAgICAgICAgICA8cmVjdAogICAgICAgICAgICAgICB0cmFuc2Zvcm09InNjYWxlKC0xLC0xKSIKICAgICAgICAgICAgICAgcnk9IjAuNDc2MDAwMDEiCiAgICAgICAgICAgICAgIHk9Ii02Ny4wMjY5MDkiCiAgICAgICAgICAgICAgIHg9Ii04Ni4yODgwNCIKICAgICAgICAgICAgICAgaGVpZ2h0PSIzMy42MDk5ODUiCiAgICAgICAgICAgICAgIHdpZHRoPSIzMy42MDk5ODUiCiAgICAgICAgICAgICAgIGlkPSJyZWN0MzAxMC0xIgogICAgICAgICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDowLjQyMjQ3MDI3O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MDtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8%2BCiAgICAgICAgICA8L2c%2BCiAgICAgICAgPC9nPgogICAgICA8L2c%2BCiAgICA8L2c%2BCiAgPC9nPgo8L3N2Zz4K&version=3&origin=travisCI";

// Build data for v2
var v2data = "dumpcache=true&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_1.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_2.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_3.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_4.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_5.svg&svgsources[]=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8%2BCjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMTA4IgogICBoZWlnaHQ9IjEwOCIKICAgaWQ9InN2ZzIiCiAgIHZlcnNpb249IjEuMSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC40IHI5OTM5IgogICBzb2RpcG9kaTpkb2NuYW1lPSJOaWV1dyBkb2N1bWVudCAxIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMC43IgogICAgIGlua3NjYXBlOmN4PSI0OTEuODQxNCIKICAgICBpbmtzY2FwZTpjeT0iMjIuNDk3MTMyIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJnMjk5OSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGZpdC1tYXJnaW4tdG9wPSIwIgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMCIKICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIgogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIwIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY%2BCiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8%2BCiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU%2BCiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxhYWcgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwMC4yODU3MSwtNDI0LjA3NjQ3KSI%2BCiAgICA8ZwogICAgICAgaWQ9ImcyOTk5IgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAwLjI4NTcxLDQyNC4wODA0NykiPgogICAgICA8Y2lyY2xlCiAgICAgICAgIGlkPSJjaXJjbGUyOTg3IgogICAgICAgICByPSI1NCIKICAgICAgICAgY3k9IjUzLjk5NTk5OCIKICAgICAgICAgY3g9IjU0IgogICAgICAgICBzb2RpcG9kaTpjeD0iNTQiCiAgICAgICAgIHNvZGlwb2RpOmN5PSI1My45OTU5OTgiCiAgICAgICAgIHNvZGlwb2RpOnJ4PSI1NCIKICAgICAgICAgc29kaXBvZGk6cnk9IjU0IgogICAgICAgICBzdHlsZT0iZmlsbDojYWM5ZDkzIgogICAgICAgICBkPSJNIDEwOCw1My45OTU5OTggQyAxMDgsODMuODE5Mzc1IDgzLjgyMzM3NiwxMDcuOTk2IDU0LDEwNy45OTYgMjQuMTc2NjI0LDEwNy45OTYgMCw4My44MTkzNzUgMCw1My45OTU5OTggMCwyNC4xNzI2MjIgMjQuMTc2NjI0LC0wLjAwNDAwMTYyIDU0LC0wLjAwNDAwMTYyIGMgMjkuODIzMzc2LDAgNTQsMjQuMTc2NjIzNjIgNTQsNTMuOTk5OTk5NjIgeiIgLz4KICAgICAgPGcKICAgICAgICAgaWQ9ImczODEwIj4KICAgICAgICA8cGF0aAogICAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2MiCiAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MC4zO2ZpbGw6IzI0MWYxYztlbmFibGUtYmFja2dyb3VuZDpuZXciCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgICBkPSJNIDMwLjgwMDkwOCw0Ny40MDQ4OTYgNTUuNzE5Nzg1LDM3LjIxNDg3NCA1NS42OTIxNzIsNzAuNzYxMzM5IDMwLjk0MDM0Niw1OS43MzM1MyB6IgogICAgICAgICAgIGlkPSJwYXRoMjk4OSIgLz4KICAgICAgICA8ZwogICAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNjQ0ODkyMSwzLjc3NDA4MjIpIgogICAgICAgICAgIGlkPSJnMzgwNSI%2BCiAgICAgICAgICA8ZwogICAgICAgICAgICAgaWQ9ImczODAxIj4KICAgICAgICAgICAgPHJlY3QKICAgICAgICAgICAgICAgcnk9IjAuMzA4IgogICAgICAgICAgICAgICB5PSI0My41ODI5NTgiCiAgICAgICAgICAgICAgIHg9IjE2LjI4ODk0IgogICAgICAgICAgICAgICBoZWlnaHQ9IjEyLjQxMDcxNCIKICAgICAgICAgICAgICAgd2lkdGg9IjEyLjQxMDcxNCIKICAgICAgICAgICAgICAgaWQ9InJlY3QzMDEwIgogICAgICAgICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDowLjE1NjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1vcGFjaXR5OjA7c3Ryb2tlLWRhc2hhcnJheTpub25lIiAvPgogICAgICAgICAgICA8cmVjdAogICAgICAgICAgICAgICB0cmFuc2Zvcm09InNjYWxlKC0xLC0xKSIKICAgICAgICAgICAgICAgcnk9IjAuNDc2MDAwMDEiCiAgICAgICAgICAgICAgIHk9Ii02Ny4wMjY5MDkiCiAgICAgICAgICAgICAgIHg9Ii04Ni4yODgwNCIKICAgICAgICAgICAgICAgaGVpZ2h0PSIzMy42MDk5ODUiCiAgICAgICAgICAgICAgIHdpZHRoPSIzMy42MDk5ODUiCiAgICAgICAgICAgICAgIGlkPSJyZWN0MzAxMC0xIgogICAgICAgICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDowLjQyMjQ3MDI3O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MDtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8%2BCiAgICAgICAgICA8L2c%2BCiAgICAgICAgPC9nPgogICAgICA8L2c%2BCiAgICA8L2c%2BCiAgPC9nPgo8L3N2Zz4K&origin=travisCI";

/*
 * Run a post request and return the collected data
 * 
 * @return object batch
 */
function runTest(batch){
    var page = require('webpage').create();

    page.open(apiurl + "?" + batch.testData, function(status) {
        // Check for error
        if (status !== 'success') {
            console.log('Unable to do request');

            // Set vars
            batch.error = true;
            batch.finished = true;
        } 
        else {
        	// Get response
            var response = JSON.parse(page.plainText);

            // Save response in batch and start validating
            batch.resultData = response;
            validateTestResults(batch);
        }
    });
};

/*
 * Run a post request and return the collected data
 *
 * @param object batch
 */
function validateTestResults(batch){
    // Loop through check batches
    if(batch.resultData.error == true){
    	batch.error = true;
    }
    else{
    	batch.success = true;
    }

    // Set batch to finished
    batch.finished = true;

    // Call next test
    runNextTest();
};

/*
 * Run the next test in the batch
 */
function runNextTest(){
	// Loop through tests
	for(var x = 0; x < batches.length; x++){
		// check if test hasn't been started yet
		if(!batches[x].started){
			batches[x].started = true;
			runTest(batches[x]);

			// Stop the looping
			return;
		}
	}

	// At this point all tests have been done and batch results need to be finished
	validateBatchData();
};

/*
 * Validate all results in the batches to check if we had a succesfull test
 */
function validateBatchData(){
	for(var x = 0; x < batches.length; x++){

	    console.log("\n===================");
		console.log("Validating test: " + batches[x].name);
		console.log("===================");

		if(batches[x].started && batches[x].finished){
			if(batches[x].error){
				console.log("Failure in test: " + batches[x].name);
				console.log("Server responded with: " + batches[x].resultData.msg);
				console.log("\nBatch data: " + JSON.stringify(batches[x]));

				phantom.exit(EXIT_FAILURE);
			}
			else if(!batches[x].success){
				console.log("Error in test " + batches[x].name + " results. No success or error reported.")
				phantom.exit(EXIT_ERROR);
			}
			else{
				console.log("Test " + batches[x].name + " success");
			}

		}
		else{
			console.log("Not all tests have been finished, calling next test again");

			runNextTest();
			return;
		}
	}

	phantom.exit(EXIT_SUCCESS);
};


/*
 * Add test to batch
 *
 * @param string name
 * @param string testData
 */
function addTest(name, testData){
	batches.push({
		name: name,
		testData: testData,
		resultData: {},
		success: false,
		started: false,
		finished: false
	});
};


/*
 * Init the testing
 */
function initAndStart(){
	addTest("v2", v2data);
	addTest("v3", v3data);

	runNextTest();
};

// Run tests
initAndStart();


