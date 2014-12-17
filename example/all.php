<!DOCTYPE html>
<html>
    <head>
        <title>Example of jQuery SVGMagic</title>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="https://rawgit.com/dirkgroenen/SVGMagic/master/src/client/jquery.svgmagic.js"></script>
    </head>
    <body>
        <img src="https://dirkgroenen.github.io/SVGMagic/style/resizeicon_3.svg" class="replace_me" id="n-one"/>
        <img src="https://dirkgroenen.github.io/SVGMagic/style/resizeicon_2.svg" class="replace_me" id="n-two" />

        <img id="d-one" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMTA4IgogICBoZWlnaHQ9IjEwOCIKICAgaWQ9InN2ZzIiCiAgIHZlcnNpb249IjEuMSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC40IHI5OTM5IgogICBzb2RpcG9kaTpkb2NuYW1lPSJOaWV1dyBkb2N1bWVudCAxIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMC43IgogICAgIGlua3NjYXBlOmN4PSI0OTEuODQxNCIKICAgICBpbmtzY2FwZTpjeT0iMjIuNDk3MTMyIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJnMjk5OSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGZpdC1tYXJnaW4tdG9wPSIwIgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMCIKICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIgogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIwIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxhYWcgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwMC4yODU3MSwtNDI0LjA3NjQ3KSI+CiAgICA8ZwogICAgICAgaWQ9ImcyOTk5IgogICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAwLjI4NTcxLDQyNC4wODA0NykiPgogICAgICA8Y2lyY2xlCiAgICAgICAgIGlkPSJjaXJjbGUyOTg3IgogICAgICAgICByPSI1NCIKICAgICAgICAgY3k9IjUzLjk5NTk5OCIKICAgICAgICAgY3g9IjU0IgogICAgICAgICBzb2RpcG9kaTpjeD0iNTQiCiAgICAgICAgIHNvZGlwb2RpOmN5PSI1My45OTU5OTgiCiAgICAgICAgIHNvZGlwb2RpOnJ4PSI1NCIKICAgICAgICAgc29kaXBvZGk6cnk9IjU0IgogICAgICAgICBzdHlsZT0iZmlsbDojYWM5ZDkzIgogICAgICAgICBkPSJNIDEwOCw1My45OTU5OTggQyAxMDgsODMuODE5Mzc1IDgzLjgyMzM3NiwxMDcuOTk2IDU0LDEwNy45OTYgMjQuMTc2NjI0LDEwNy45OTYgMCw4My44MTkzNzUgMCw1My45OTU5OTggMCwyNC4xNzI2MjIgMjQuMTc2NjI0LC0wLjAwNDAwMTYyIDU0LC0wLjAwNDAwMTYyIGMgMjkuODIzMzc2LDAgNTQsMjQuMTc2NjIzNjIgNTQsNTMuOTk5OTk5NjIgeiIgLz4KICAgICAgPGcKICAgICAgICAgaWQ9ImczODEwIj4KICAgICAgICA8cGF0aAogICAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2MiCiAgICAgICAgICAgc3R5bGU9Im9wYWNpdHk6MC4zO2ZpbGw6IzI0MWYxYztlbmFibGUtYmFja2dyb3VuZDpuZXciCiAgICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgICBkPSJNIDMwLjgwMDkwOCw0Ny40MDQ4OTYgNTUuNzE5Nzg1LDM3LjIxNDg3NCA1NS42OTIxNzIsNzAuNzYxMzM5IDMwLjk0MDM0Niw1OS43MzM1MyB6IgogICAgICAgICAgIGlkPSJwYXRoMjk4OSIgLz4KICAgICAgICA8ZwogICAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNjQ0ODkyMSwzLjc3NDA4MjIpIgogICAgICAgICAgIGlkPSJnMzgwNSI+CiAgICAgICAgICA8ZwogICAgICAgICAgICAgaWQ9ImczODAxIj4KICAgICAgICAgICAgPHJlY3QKICAgICAgICAgICAgICAgcnk9IjAuMzA4IgogICAgICAgICAgICAgICB5PSI0My41ODI5NTgiCiAgICAgICAgICAgICAgIHg9IjE2LjI4ODk0IgogICAgICAgICAgICAgICBoZWlnaHQ9IjEyLjQxMDcxNCIKICAgICAgICAgICAgICAgd2lkdGg9IjEyLjQxMDcxNCIKICAgICAgICAgICAgICAgaWQ9InJlY3QzMDEwIgogICAgICAgICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDowLjE1NjtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1vcGFjaXR5OjA7c3Ryb2tlLWRhc2hhcnJheTpub25lIiAvPgogICAgICAgICAgICA8cmVjdAogICAgICAgICAgICAgICB0cmFuc2Zvcm09InNjYWxlKC0xLC0xKSIKICAgICAgICAgICAgICAgcnk9IjAuNDc2MDAwMDEiCiAgICAgICAgICAgICAgIHk9Ii02Ny4wMjY5MDkiCiAgICAgICAgICAgICAgIHg9Ii04Ni4yODgwNCIKICAgICAgICAgICAgICAgaGVpZ2h0PSIzMy42MDk5ODUiCiAgICAgICAgICAgICAgIHdpZHRoPSIzMy42MDk5ODUiCiAgICAgICAgICAgICAgIGlkPSJyZWN0MzAxMC0xIgogICAgICAgICAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDowLjQyMjQ3MDI3O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MDtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8+CiAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K" class="replace_me"/>

        <div id="b-one" style="width: 100px;height: 100px;background-image:url('https://dirkgroenen.github.io/SVGMagic/style/resizeicon_4.svg');" class="replace_me">Background</div>

        <span id="replacetime"></span>

        <script>
            $(document).ready(function() {
                var starttime = Date.now();

                $('.replace_me').svgmagic({
                    forceReplacements: true,
                    handleBackgroundImages: true,
                    additionalRequestData: {dumpcache: <?php echo $_GET['dumpcache']; ?>},
                    postReplacementCallback: function(){
                        var diff = Date.now() - starttime;
                        $("#replacetime").text(diff);
                    }
                });
            });
        </script>
    </body>
</html>