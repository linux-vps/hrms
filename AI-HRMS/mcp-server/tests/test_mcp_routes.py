"""
Tests for MCP routes
"""
import pytest
from app import create_app

@pytest.fixture
def client():
    """Create a test client for the app."""
    app = create_app()
    app.config['TESTING'] = True
    
    with app.test_client() as client:
        yield client

def test_get_tools(client):
    """Test the /mcp/tools endpoint."""
    response = client.get('/mcp/tools')
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert len(response.json) > 0
    
    # Check tool schema
    tool = response.json[0]
    assert "name" in tool
    assert "description" in tool
    assert "input_schema" in tool
