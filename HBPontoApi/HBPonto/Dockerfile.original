#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM microsoft/dotnet:2.1-aspnetcore-runtime-nanoserver-1803 AS base
WORKDIR /app
EXPOSE 58690:80
EXPOSE 44337:443

FROM microsoft/dotnet:2.1-sdk-nanoserver-1803 AS build
WORKDIR /src
COPY ["HBPonto/HBPonto.csproj", "HBPonto/"]
COPY ["HBPonto.IoC/HBPonto.IoC.csproj", "HBPonto.IoC/"]
COPY ["HBPonto.Authentication/HBPonto.Authentication.csproj", "HBPonto.Authentication/"]
COPY ["HBPonto.Interfaces/HBPonto.Kernel.csproj", "HBPonto.Interfaces/"]
COPY ["HBPonto.JIRA/HBPonto.JIRA.csproj", "HBPonto.JIRA/"]
RUN dotnet restore "HBPonto/HBPonto.csproj"
COPY . .
WORKDIR "/src/HBPonto"
RUN dotnet build "HBPonto.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "HBPonto.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "HBPonto.dll"]